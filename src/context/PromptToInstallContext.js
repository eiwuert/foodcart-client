import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';

const PromptToInstallContext = createContext(null);

export const usePromptToInstall = () => useContext(PromptToInstallContext);

export const PromptToInstallProvider = (props) => {
  const [deferredEvt, setDeferredEvt] = useState(null);

  const hidePrompt = useCallback(() => {
    setDeferredEvt(null);
  }, []);

  useEffect(() => {
    const ready = (e) => {
      e.preventDefault();
      setDeferredEvt(e);
    };
    window.addEventListener('beforeinstallprompt', ready);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
    };
  }, []);

  return (
    <PromptToInstallContext.Provider value={{ deferredEvt, hidePrompt }}>
      {props.children}
    </PromptToInstallContext.Provider>
  );
};

PromptToInstallProvider.propTypes = {
  children: PropTypes.object
};
