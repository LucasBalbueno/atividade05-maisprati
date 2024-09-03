
import axios from 'axios';

export const translateService = async (text, sourceLang, targetLang) => {
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`,
        },
      });
      return response.data.responseData.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      throw error;
    }
  };