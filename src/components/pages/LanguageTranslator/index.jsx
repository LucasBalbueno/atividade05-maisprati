import { useState } from 'react';
import { translateService } from '../../../services/Translator'
import { Container, Title, Label, Select, Input, Button, TranslatedText } from './style';

const LanguageTranslator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  const translateText = async () => {
    try {
      const translate = await translateService(text, sourceLang, targetLang)
      setTranslatedText(translate);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  }

  return (
    <Container>
      <Title>Language Translator</Title>
      <div>
        <Label>Source Language:</Label>
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <div>
        <Label>Target Language:</Label>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <Button onClick={translateText}>Translate</Button>
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>}
    </Container>
  );
};

export default LanguageTranslator;