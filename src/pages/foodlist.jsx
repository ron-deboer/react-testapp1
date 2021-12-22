import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodStore from '../stores/foodstore';
import FoodDataTable from '../components/fooddatatable';
import PubSub from '../services/pubsub';

function Foodlist(props) {
    const [foods, setFoods] = useState(FoodStore.getFoods());

    useEffect(() => {
        PubSub.on(PubSub.topic.STORE_UPDATED, getFoods);
        return function cleanup() {
            PubSub.off(PubSub.topic.STORE_UPDATED, getFoods);
        };
    }, []);

    const getFoods = (type, msg) => {
        setFoods(FoodStore.getFoods());
    };

    return (
        <div className="is-full-screen text-center">
            <h1 className="">FOOD LIST</h1>
            <FoodDataTable
                data={foods.sort((i1, i2) => {
                    return i1.name > i2.name ? 1 : -1;
                })}
            />
            <p>
                <button className="button btn" onClick={() => FoodStore.fetchFoods()}>
                    RELOAD FOOD LIST
                </button>
                <Link to="/addfood" className="button btn">
                    ADD FOOD
                </Link>
            </p>
        </div>
    );
}

export default Foodlist;
