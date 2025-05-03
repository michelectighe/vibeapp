import { fft } from "fft-js";

export const processAudioBuffer = (audioBuffer) => {
  // Example usage:
  const sampleRate = 44100; // or the sample rate of your audio input
  //const audioBuffer = []/* your raw PCM data as an array of numbers */;
  const magnitudes = computeSpectrum(audioBuffer);
  const centroid = spectralCentroid(magnitudes, sampleRate);
  const rollOff = spectralRollOff(magnitudes, sampleRate);

  // //console.log("Spectral Centroid:", centroid, "Hz");
  // //console.log("Spectral Roll-off:", rollOff, "Hz");

  // Given a time-domain buffer of audio samples:
  function computeSpectrum(signal) {
    // Compute the FFT; returns an array of complex numbers [real, imag]
    const phasors = fft(signal);
    // Convert to magnitude spectrum
    const magnitudes = phasors.map(([real, imag]) =>
      Math.sqrt(real * real + imag * imag)
    );
    return magnitudes;
  }

  function spectralCentroid(magnitudes, sampleRate) {
    const numBins = magnitudes.length;
    // Frequency resolution (assume FFT length is 2*numBins)
    const binWidth = sampleRate / (numBins * 2);
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < numBins; i++) {
      const freq = i * binWidth;
      numerator += freq * magnitudes[i];
      denominator += magnitudes[i];
    }
    return denominator > 0 ? numerator / denominator : 0;
  }

  function spectralRollOff(magnitudes, sampleRate, rolloffPercent = 0.85) {
    const totalEnergy = magnitudes.reduce((sum, mag) => sum + mag, 0);
    const threshold = totalEnergy * rolloffPercent;
    let cumulativeEnergy = 0;
    const numBins = magnitudes.length;
    const binWidth = sampleRate / (numBins * 2);
    let rollOffFrequency = 0;
    for (let i = 0; i < numBins; i++) {
      cumulativeEnergy += magnitudes[i];
      if (cumulativeEnergy >= threshold) {
        rollOffFrequency = i * binWidth;
        break;
      }
    }
    return rollOffFrequency;
  }

  return centroid, rollOff;
}
