import { useState } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import Button from 'components/Button';
import Card from 'components/Card';
import { useAppInteraction } from 'components/AppManager';
import styles from './Home.module.scss';

export interface MovieInterface {
  id: number,
  name: string,
}

interface DetailProps extends Omit<ComponentProps, 'children'> {
  movie: MovieInterface,
}

const DetailDefaults: Omit<ComponentProps, 'movie'> = {
  ...ComponentDefaults,
};

function Detail(props: DetailProps): JSX.Element {
  const {
    className,
    style,
    movie,
    ...rest
  } = {
    ...DetailDefaults,
    ...props,
  };
  const closeInteraction = useAppInteraction();

  return (
    <Card
      className={`${styles.Detail} ${className}`}
      data-ui="Detail"
      style={style}
      {...rest}
    >
      <div>
        {movie.id}
      </div>
      <div>
        <Button
          onClick={() => closeInteraction('foo')}
        >
          close modal!!!
        </Button>
      </div>
    </Card>
  );
}

export default Detail;
