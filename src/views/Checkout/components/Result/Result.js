import React, { useEffect } from 'react';
import { useCart } from 'context';
import { Result as ResultComponent } from 'components';

const Result = () => {
  const { emptyCart } = useCart();

  useEffect(() => {
    emptyCart();
  }, []);

  return (
    <ResultComponent
      homeButton
      icon={'CheckCircleIcon'}
      primary={'Fertig!'}
      secondary={
        'Wir haben deine Bestellung erhalten, leckeres Essen ist schon auf dem Weg.'
      }
    />
  );
};

export default Result;
