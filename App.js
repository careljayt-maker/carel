import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const addNote = () => {
    if (note.trim() === "") return;

    setNotes([...notes, note]);
    setNote("");
  };

  const selectNote = (index) => {
    setNote(notes[index]);
    setSelectedIndex(index);
    setEditMode(true);
  };

  const updateNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedIndex] = note;
    setNotes(updatedNotes);
    setNote("");
    setEditMode(false);
  };

  const cancelEdit = () => {
    setNote("");
    setEditMode(false);
  };

  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== selectedIndex);
    setNotes(newNotes);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a note..."
        value={note}
        onChangeText={setNote}
      />

      {/* Buttons */}
      {!editMode ? (
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.updateBtn} onPress={updateNote}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn2} onPress={cancelEdit}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => selectNote(index)}
            onLongPress={() => openDeleteModal(index)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Delete Modal */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Note</Text>
            <Text style={styles.modalText}>
              Do you want to delete this note?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={deleteNote}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  editButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  updateBtn: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },

  cancelBtn2: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  note: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    marginTop: 10,
    borderRadius: 5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalBox: {
    width: 280,
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalText: {
    color: "white",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelBtn: {
    padding: 10,
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
  },

  deleteBtn: {
    padding: 10,
  },

  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});