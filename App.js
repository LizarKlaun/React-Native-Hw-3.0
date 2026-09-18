import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddItem = () => {
    if (!title.trim()) return;

    const parsedQuantity = parseInt(quantity, 10);
    const finalQuantity = isNaN(parsedQuantity) || parsedQuantity <= 0 ? 1 : parsedQuantity;

    const newItem = {
      id: Date.now().toString(),
      title: title.trim(),
      quantity: finalQuantity,
      isBought: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setTitle('');
    setQuantity('');
  };

  const toggleStatus = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Список покупок</Text>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Назва товару"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputQuantity}
          placeholder="К-сть"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Додати</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Список покупок порожній</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, item.isBought && styles.itemTitleBought]}>
                  {item.title}
                </Text>
                <Text style={styles.itemQuantity}>Кількість: {item.quantity}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.statusButton, item.isBought ? styles.statusBought : styles.statusNotBought]}
                  onPress={() => toggleStatus(item.id)}
                >
                  <Text style={styles.statusButtonText}>
                    {item.isBought ? 'Куплено' : 'Не куплено'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputForm: { flexDirection: 'row', marginBottom: 20 },
  inputTitle: { flex: 2, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CED4DA', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, fontSize: 16 },
  inputQuantity: { flex: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CED4DA', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, fontSize: 16, textAlign: 'center' },
  addButton: { backgroundColor: '#0D6EFD', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, color: '#6C757D', fontStyle: 'italic' },
  itemRow: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E9ECEF' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 18, fontWeight: '600', color: '#212529' },
  itemTitleBought: { textDecorationLine: 'line-through', color: '#adb5bd' },
  itemQuantity: { fontSize: 14, color: '#6C757D', marginTop: 2 },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  statusButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginRight: 8 },
  statusNotBought: { backgroundColor: '#FFC107' },
  statusBought: { backgroundColor: '#198754' },
  statusButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  deleteButton: { backgroundColor: '#DC3545', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  deleteButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});