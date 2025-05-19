// MeditationSpaceFinder.js (real-time analysis)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import { analyzePeacefulness } from '@/utils';
import { useModels } from '@context';

export const MeditationSpotFinder = () => {
  const { soundModel, sounds } = useModels();
  const [vibeList, setVibeList] = useState([]);
  const [good, setGood] = useState(null);
  const[bad, setBad] = useState(null);
  const [background, setBackground] = useState('gray');
  const audioBuffer = React.useRef([]);

  useEffect(() => {
    let interval;

    const init = async () => {
      AudioRecord.init({
        sampleRate: 15600,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6, // voice recognition
        wavFile: 'realtime.wav',
      });

      AudioRecord.on('data', (data) => {
        const chunk = Buffer.from(data, 'base64');
        for (let i = 0; i < chunk.length; i += 2) {
          const sample = chunk.readInt16LE(i);
          audioBuffer.current.push(sample / 32768);
        }
      });

      AudioRecord.start();

      interval = setInterval(async () => {
        if (!soundModel || audioBuffer.current.length < 15600) return;

        const slice = audioBuffer.current.slice(-15600);
        const padded = new Float32Array(15600);
        padded.set(slice);

        const result = await analyzePeacefulness(padded, soundModel, sounds);
        updateUI(result);
      }, 1000);
    };

    init();
    return () => {
      clearInterval(interval);
      AudioRecord.stop();
    };
  }, [soundModel, sounds]);

  const updateUI = (results) => {
    const { rankedCategories, percentGood, percentBad } = results;
  
    setVibeList(rankedCategories);
    setGood(percentGood);
    setBad(percentBad);
  
    if (rankedCategories[0]?.category === 'peaceful') setBackground('#3fa86c');
    else if (rankedCategories[0]?.category === 'chaotic') setBackground('#aa2e2e');
    else setBackground('#999999');
  };  
  

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.vibeText}>TOP CATEGORIES</Text>
      {vibeList.map((item, index) => (
        <Text key={index} style={styles.vibeItem}>
          {item.category.toUpperCase()}: {(item.score * 100).toFixed(2)}%
        </Text>
      ))}
      <Text>PercentGood: {good}</Text>
      <Text>Percent Bad: {bad}</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  vibeText: { fontSize: 32, fontWeight: 'bold', color: 'white' },
});
