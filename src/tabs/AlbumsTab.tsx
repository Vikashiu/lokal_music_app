import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlbumListItem, { Album } from '../components/AlbumListItem';
import { useThemeStore, Colors } from '../store/useThemeStore';

const ALBUMS_API = `https://saavn.sumit.co/api/search/albums?query=hits&limit=20`;

export default function AlbumsTab() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  // 1. Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  useEffect(() => {
    fetchAlbums(1);
  }, []);

  const fetchAlbums = async (pageNumber: number) => {
    if (loading || (!hasMore && pageNumber !== 1)) return;
    setLoading(true);

    try {
      const response = await fetch(`${ALBUMS_API}&page=${pageNumber}`);
      const json = await response.json();

      if (json.success && json.data && json.data.results) {
        const mappedAlbums: Album[] = json.data.results.map((item: any) => {
          const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
          
          let artistName = "Unknown";
          if (item.artists?.primary) artistName = item.artists.primary[0]?.name;
          else if (item.primaryArtists) artistName = item.primaryArtists;

          return {
            id: item.id,
            name: item.name.replace(/&quot;/g, '"'),
            artist: artistName,
            year: item.year || "2024",
            songCount: item.songCount || "?", 
            image: imgObj?.url || imgObj?.link
          };
        });

        if (mappedAlbums.length === 0) {
          setHasMore(false);
        } else {
          setAlbums(prev => pageNumber === 1 ? mappedAlbums : [...prev, ...mappedAlbums]);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Load More
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAlbums(nextPage);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Text style={[styles.countText, { color: theme.text }]}>{albums.length} albums</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={[styles.sortText, { color: theme.primary }]}>Date Modified</Text>
          <Ionicons name="swap-vertical" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={albums}
        keyExtractor={(item, index) => item.id + index}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => <AlbumListItem album={item} />}
        
        // 3. Infinite Scroll Props
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        
        // 4. Loading Indicators
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator size="small" color={theme.primary} style={{ marginVertical: 20 }} />
          ) : null
        }
        ListEmptyComponent={
          loading && page === 1 ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 40, color: theme.subText }}>
              No albums found.
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15
  },
  countText: { fontSize: 18, fontWeight: 'bold' },
  sortButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sortText: { fontWeight: '600' }
});