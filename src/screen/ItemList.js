import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import useAuthStore from '../store/store';

const ItemList = () => {
    const { items, loading, error, fetchItems } = useAuthStore((state) => ({
        items: state.items,
        loading: state.loading,
        error: state.error,
        fetchItems: state.fetchItems,
    }));

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <View style={{ width: 50, height: 50 }}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            resizeMode='contain'
                            source={{ uri: item.image }}
                        />
                    </View>

                    <View>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Text style={styles.itemRate}>${item.price}</Text>
                        <Text style={styles.itemDesc}>{item.description}</Text>
                        <Text style={styles.itemTitle}><Text style={styles.itemText}>{item?.category}</Text>  {item?.rating?.rate} of {item?.rating?.count}</Text>
                    </View>

                </View>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    listContainer: {
        padding: 10,
    },
    itemContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 5,
        flexDirection: 'row'
    },
    itemText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 20
    },
    itemTitle: {
        fontSize: 14,
        marginLeft: 5,
        marginRight: 20
    },
    itemDesc: {
        fontSize: 14,
        marginLeft: 5,
        marginRight: 40,
        fontStyle: 'italic'
    },
    itemRate: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 20,
        fontWeight: '600',
        color: '#00ff'
    },
});

export default ItemList;