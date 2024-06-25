import React from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteRecordById, checkDependenciesById } from '../database/utils';
import PropTypes from 'prop-types';
// Styles and Design
import { styles } from '../styles/styles';
import IconTrash from '../../assets/icons/trash.svg';

function humanize(str) {
  var lowerCaseStr = str.toLowerCase();

  if (lowerCaseStr.endsWith('s')) {
    lowerCaseStr = lowerCaseStr.slice(0, -1);
  }
  return lowerCaseStr;
}

var DeleteButton = ({ tableName, recordId, alertText, checkDependencies }) => {
  var navigation = useNavigation();
  var item_name = humanize(tableName);
  var alert_text = alertText || `Are you sure you want to delete this ${item_name}?`;
  var isDisabled = false;

  if (checkDependencies) {
    checkDependenciesById(tableName, recordId).then((hasDependencies) => {
      isDisabled = hasDependencies;
    });
  }

  var handleDelete = () => {
    if (isDisabled) {
      Alert.alert(
        'Delete',
        `This ${item_name} has dependencies and cannot be deleted.`,
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
      );
      return;
    } else {
      Alert.alert(
        'Delete',
        alert_text,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              deleteRecordById(tableName, recordId);
              navigation.goBack();
            },
            style: 'destructive',
          },
        ],
      );
    }
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <View style={styles.deleteButton}>
        <IconTrash
          width={styles.deleteButtonIcon.width}
          height={styles.deleteButtonIcon.height}
          fill={styles.deleteButtonText.color}
        />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );
};

DeleteButton.propTypes = {
  tableName: PropTypes.string.isRequired,
  recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alertText: PropTypes.string,
  checkDependencies: PropTypes.bool,
};

export default DeleteButton;
