import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';
import Connect from './Connect';
import GameList from './GameList';

const HookMqtt = () => {

    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState('Connect');

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connected');
        setClient(mqtt.connect(host, mqttOption));
      };
    
      useEffect(() => {
        if (client) {
          client.on('connect', () => {
            setConnectStatus('Connected');
          });
          client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
          });
        }
      }, [client]);

    const content = () => {
        if (connectStatus === "Connected"){
            return (<GameList/>)
        } else {
            return (<Connect connect={mqttConnect}/>);
        }
    }

    return ( 
        <div>
            {content()}
        </div>
     );
}
 
export default HookMqtt;