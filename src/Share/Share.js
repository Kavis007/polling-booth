import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import API_BASE_URL from '../api';

function Share() {
    const { id } = useParams();
    const [sharedpoll, setSharedpoll] = useState({
        _id: "",
        created_date: "",
        poll_id: "",
        title: "",
        category: {
            _id: "",
            category_name: ""
        },
        question: "",
        options: [],
        status: "",
        createdBy: {
            _id: "",
            user_name: "",
            user_type: "",
        },
        likers: [],
        voters: [],
        isActive: "",
        expirationTime: "",
        comments: []
    });
    const [user, setUser] = useState({ userID: "" });

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/polls/getone`, {
                    poll_id: id
                });
                if (res.data) {
                    setSharedpoll(res.data);
                } else {
                    console.error('Poll data not found');
                }
            } catch (error) {
                console.error('Error fetching poll data:', error);
            }
        };

        fetchPoll();
    }, [id]);

    return (
        <Card className="mt-4" style={{ border: '1px solid #007bff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <Card.Body>
                <h5 className="text-primary">{sharedpoll.title}</h5>
                <h3>{sharedpoll.question}</h3>
                <Button className="category_button_in_card" variant="info" aria-label={`Category: ${sharedpoll.category.category_name}`}>
                    {sharedpoll.category.category_name}
                </Button>
                <Row className="mt-3">
                    <Col>
                        <Card className="p-2" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                            <Card.Body>
                                <ol>
                                    {sharedpoll.options && sharedpoll.options.map((opt, index) => (
                                        <li key={index}>{opt.option}</li>
                                    ))}
                                </ol>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <strong>Voters:</strong> {sharedpoll.voters && sharedpoll.voters.length}
                    </Col>
                    <Col>
                        <strong>Likes:</strong> {sharedpoll.likers && sharedpoll.likers.length}
                    </Col>
                </Row>
                {/* Optional Share Button */}
                <Button 
                    className="mt-3" 
                    variant="success" 
                    onClick={() => alert('Sharing functionality not implemented yet')} 
                    aria-label="Share this poll"
                >
                    Share
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Share;
