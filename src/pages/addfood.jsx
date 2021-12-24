import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PubSub from '../services/pubsub';

import FoodStore from '../stores/foodstore';
import FormField from '../components/FormField';

export default function Addfood(props) {
    const { id } = useParams();
    const { addFood } = FoodStore;
    let navigate = useNavigate();

    let food = {
        category: '',
        name: '',
        calories: '',
        carbs: '',
    };

    const form = [
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: ['Fruit', 'Vegetables', 'Nuts and Seeds'],
            isRequired: true,
        },
        { name: 'name', label: 'Name', type: 'text', isRequired: true, minlength: 3 },
        { name: 'calories', label: 'Calories per 100g', type: 'number', isRequired: true, minlength: 1 },
        { name: 'carbs', label: 'Carbs per 100g', type: 'number', isRequired: true, minlength: 1 },
    ];

    useEffect(() => {
        console.log('1111', id);
    }, []);

    const onSubmit = () => {
        const collection = document.querySelectorAll('#addfoodform input, #addfoodform select');
        let data = {};
        let errors = '';
        collection.forEach((item) => {
            item.focus();
            item.blur();
            errors += item.getAttribute('errors');
            data[item.id] = item.value;
        });
        if (errors !== '') {
            setTimeout(() => {
                PubSub.emit(PubSub.topic.SHOW_SNACKBAR, {
                    type: 'error',
                    text: 'Fix errors then submit again',
                });
            }, 50);
        } else {
            data.calories = parseInt(data.calories);
            data.carbs = parseFloat(data.carbs);
            addFood(data);
            PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'success', text: 'Add food Success' });
            navigate('/foodlist');
        }
    };

    return (
        <div className="container col-6" style={{ margin: 'auto' }}>
            <div className="card" style={{ marginTop: 20, padding: 50 }}>
                <header>
                    <h4>Add Food</h4>
                </header>
                <form id="addfoodform">
                    {form.map((fld, idx) => {
                        return (
                            <FormField
                                key={idx}
                                type={fld.type}
                                name={fld.name}
                                value={food[fld.name]}
                                label={fld.label}
                                isrequired={fld.isrequired}
                                minlength={fld.minlength}
                                options={fld.options}
                            />
                        );
                    })}
                    <div className="button primary" onClick={onSubmit} style={{ marginTop: 20 }}>
                        Submit
                    </div>
                </form>
            </div>
            <div className="container is-center" style={{ marginTop: 20 }}>
                <Link to="/foodlist" className="button btn">
                    BACK
                </Link>
            </div>
        </div>
    );
}
