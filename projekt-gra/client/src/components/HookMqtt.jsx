import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { connect } from "react-redux";
import Connect from './Connect';
import GameList from './GameList';
import GameBoard from './GameBoard';
import { getGameList } from '../actions/gameActions';


const HookMqtt = ({games, getGameList}) => {

    useEffect(() => {
      getGameList();
    }, [])

    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [topicName, setTopicName] = useState(null);
    const [username, setUsername] = useState('');
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connected');
        const client = mqtt.connect(host, mqttOption);
        // console.log("option", mqttOption);
        setUsername(mqttOption.username);
        setClient(client);

        // setTimeout(() => {
        //   if (client) {
            
        //   }
        // }, 1000);
        
        
      };
    
      useEffect(() => {
        if (client) {
          client.on('connect', (err) => {
            if (err){
              console.log(err);
            } else {
              setConnectStatus('Connected');
              console.log("Connected");

              // mqttSubscribe('game-list-board');
              setTopicName("game-list-board");
              client.subscribe("game-list-board")
            }
            mqttSubscribe('game-list-board');
            setTopicName("game-list-board");
            
          });
          client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
          });
          client.on('message', (topic, message) => {
            console.log("msg");
            let payload = JSON.parse(message.toString());
            payload.topic = topic;
            console.log("msg:", payload);
            // const payload = { topic, username, message: message.toString() };
            // console.log("payload", payload);
            setPayload(payload);
          });
        }
      }, [client]);

    const mqttSubscribe = (topic) => {
      
      if (client) {
        console.log("sub");
        client.subscribe(topic, (err) => {
          if (err) {
            console.log(err);
            return;
          }
            
          if (topic !== "game-list-board")
            setIsSub(true);
        })
      }
      
    }

    const mqttPublish = (topic, message) => {
      console.log("pub");
      client.publish(topic, message, (err) => {
        if (err) {
          console.log("Error: ", err);
        }
      })
    }

    const mqttUnSub = (topic) => {
      if (client) {
        client.unsubscribe(topic, error => {
          if (error) {
            console.log('Unsubscribe error', error)
            return
          }
          setIsSub(false);
        });
      }
    };

    const content = () => {
        if (connectStatus === "Connected"){
            if (isSubed){

              const game = games.find(game => game.gameId === topicName);
              return (<GameBoard game={game} topic={topicName} publish={mqttPublish} unsubscribe={mqttUnSub}
              payload={payload} username={username}/>)
            } else {
              return (<GameList subscribe={mqttSubscribe}
                setTopic={setTopicName}
                publish={mqttPublish}
                username={username}
                payload={payload}
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
 
const mapStateToProps = (state) => {
  console.log(state);
  return {
      games: state.games
  }
}

const mapDispatchToProps = {
  getGameList
};

export default connect(mapStateToProps, mapDispatchToProps)(HookMqtt);