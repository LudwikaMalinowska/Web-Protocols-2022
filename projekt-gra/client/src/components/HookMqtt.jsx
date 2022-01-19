import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';
import Connect from './Connect';
import GameList from './GameList';
import GameBoard from './GameBoard';

const HookMqtt = () => {

    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [topicName, setTopicName] = useState(null);
    const [payload, setPayload] = useState({});
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
          client.on('message', (topic, message) => {
            const payload = { topic, message: message.toString() };
            setPayload(payload);
          });
        }
      }, [client]);

    const mqttSubscribe = (topic) => {
      
      client.subscribe(topic, (err) => {
        if (err) {
          console.log(err);
          return;
        }
          

        setIsSub(true);
      })
    }

    const mqttPublish = (topic, message) => {
      client.publish(topic, message, (err) => {
        if (err) {
          console.log("Error: ", err);
        }
      })
    }

    const content = () => {
        if (connectStatus === "Connected"){
            if (isSubed){
              return (<GameBoard topic={topicName} publish={mqttPublish} payload={payload}/>)
            } else {
              return (<GameList subscribe={mqttSubscribe}
                setTopic={setTopicName}
              />)
            }
              
        } else {
            return (<Connect connect={mqttConnect}/>);
        }
    }

    return ( 
        <div className='hook'>
          {content()}
        </div>
            
     );
}
 
export default HookMqtt;