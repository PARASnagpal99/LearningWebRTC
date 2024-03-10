import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

const SocketContext = createContext(null);


export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
  };
  
export const SocketProvider = (props) => {
  const socket = useMemo(() => io('localhost:8000'), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  useSocket.propTypes = {
    children: PropTypes.node,
  };
  
  SocketContext.Provider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object.isRequired,
  };
  

