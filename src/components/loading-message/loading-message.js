import { message } from 'antd';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const key = 'updatable';

const loading = {
  key,
  type: 'loading',
  content: 'Ищу билеты...',
  duration: 2,
};

const success = {
  key,
  type: 'success',
  duration: 2,
};

const makeSuccess = (count) => {
  const obj = { ...success };
  obj.content = `Нашел ${count} билетов`;
  return obj;
};

const LoadingMessage = ({ searchStop, count }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = makeSuccess(count);
  const obj = searchStop ? success : loading;

  const openMessage = () => {
    messageApi.open(obj);
  };

  useEffect(() => {
    openMessage();
  });

  return <>{contextHolder}</>;
};

LoadingMessage.propTypes = {
  searchStop: PropTypes.bool,
  count: PropTypes.number,
};

export default LoadingMessage;
