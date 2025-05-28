import React from 'react';
const Ws = () => {
    const ws = React.useRef(null);
    const _timer = React.useRef(null);
    const [state, setState] = React.useState(WebSocket.CONNECTING);
    const [wsErrors, setWsErrors] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const timer = (start) => {
        if (start) {
            if (_timer.current) {
                clearInterval(_timer.current);
            }
            _timer.current = setInterval(() => {
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send('Hello from client!');
                    console.log('Sent message to server');
                }
            }, 1000);
        }
        else {
            if (_timer.current) {
                clearInterval(_timer.current);
            }
        }
    }
    const connect = () => {
        
        ws.current = new WebSocket('ws://localhost:3000/echo');
        ws.current.onopen = () => {
            console.log('WebSocket connection established', ws.current.extensions);
            ws.current.send('Hello from client!');
            setState(WebSocket.OPEN);
        };
        ws.current.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setMessage((prev) => {
                const newMessage = new Date().toTimeString().split(" ")[0] + ": " + event.data;
                return prev === '' ? newMessage : prev + '\n' + newMessage;

            });;
        };
        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
            setState(WebSocket.CLOSED);
        };
        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setWsErrors(error.type);
            setState(WebSocket.CLOSED);
        };
    }

    const closeConnection = () => {
        if (ws.current) {
            if (ws.current.readyState === WebSocket.OPEN) {
                ws.current.send('Client is closing the connection');
            }
            ws.current.close();
            console.log('WebSocket connection closed by client');
            setState(WebSocket.CLOSED);
        }
    };

    React.useEffect(() => {
        if (!ws.current) {
            console.log('Connecting to WebSocket server...');
            connect();
        }
        // Check if WebSocket is already connected
        timer(true);
        return () => {
            timer(false);
        };
    }, []);
    const stateToString = (state) => {
        switch (state) {
            case WebSocket.CONNECTING:
                return 'CONNECTING';
            case WebSocket.OPEN:
                return 'OPEN';
            case WebSocket.CLOSING:
                return 'CLOSING';
            case WebSocket.CLOSED:
                return 'CLOSED';
            default:
                return 'UNKNOWN';
        }
    }
    return (
        <div>
            {/* TODO: Add your component content here */}
            <h1>WS test</h1>
            <p>{stateToString(state)}</p>
            <h2>Messages:</h2>
            {wsErrors && <p style={{ color: 'red' }}>Error: {wsErrors}</p>}
            <div style={{
                border: '1px solid black', padding: '10px', overflowY: 'scroll', height: '30vh',
                display: 'flex', flexDirection: 'column', gap: '1px'
            }}>
                {message.split('\n').map((msg, index) => (
                    <span key={index}>{msg}</span>
                ))}
            </div>
            <div>
                <button onClick={connect}>Connect</button>
                <button onClick={closeConnection}>Close Connection</button>
                <button onClick={() => {
                    setMessage('');
                }
                }>Clear Messages</button>
                <button onClick={() => {
                    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                        ws.current.send('Hello from client!');
                    }
                }}>Send Message</button>
                <button onClick={() => { timer(true) }}>Start Timer</button>
                <button onClick={() => { timer(false) }}>Stop Timer</button>
                <div>
                    <input id='messageInput' type='text'  style={{ width: '300px', marginRight: '10px' }} />
                    <button onClick={() => {
                        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                            const input = document.getElementById('messageInput');
                            if (input) {
                                const messageToSend = input.value;
                                if (messageToSend.trim() !== '') {
                                    ws.current.send(messageToSend);
                                    input.value = ''; // Clear the input after sending
                                } else {
                                    console.warn('Cannot send empty message');
                                }
                            } else {
                                console.error('Input element not found');
                            }
                        }
                    }
                    }>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Ws;