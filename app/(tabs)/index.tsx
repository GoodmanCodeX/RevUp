import { Image } from 'expo-image';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

//configuración de supabase
//'@/lib/supabase' porque el proyecto usa alias de ruta
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {

  // 3. Este bloque se ejecuta cuando la pantalla se carga
  useEffect(() => {
    async function probarConexion() {
      console.log("Intentando conectar con Supabase...");
      
      const { data, error } = await supabase
        .from('perfiles_prueba')
        .select('*');

      if (error) {
        console.error('❌ Error de conexión:', error.message);
      } else {
        console.log('✅ ¡Conexión exitosa! Datos de la tabla:', data);
      }
    }

    probarConexion();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">RevUp Project</ThemedText> 
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Estado de la Base de Datos:</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
        </ThemedText>
      </ThemedView>
      {/* ... etc ... */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 4,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});