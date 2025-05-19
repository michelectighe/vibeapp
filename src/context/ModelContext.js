// ModelContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadTensorflowModel } from 'react-native-fast-tflite';
import RNFS from 'react-native-fs';
import { loadSoundClassLabels } from '@/utils';

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [soundModel, setSoundModel] = useState(null);
  const [emotionModel, setEmotionModel] = useState(null);
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const sm = await loadTensorflowModel(require('@assets/models/sound.tflite'));
        setSoundModel(sm);

        const em = await loadTensorflowModel(require('@assets/models/ferplus_model_pd_best.tflite'));
        setEmotionModel(em);

        const sounds = await loadSoundClassLabels();
        setSounds(sounds);
      } catch (e) {
        console.error('Model loading failed:', e);
      }
    })();
  }, []);

  return (
    <ModelContext.Provider value={{ soundModel, emotionModel, sounds }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModels = () => useContext(ModelContext);
