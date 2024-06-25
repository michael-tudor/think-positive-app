import React from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteRecordById } from '../database/utils';
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

var DeleteButton = ({ tableName, recordId, alertText }) => {
  var navigation = useNavigation();
  var item_name = humanize(tableName);
  var alert_text = alertText || `Are you sure you want to delete this ${item_name}?`;

  var handleDelete = () => {
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
};

export default DeleteButton;
