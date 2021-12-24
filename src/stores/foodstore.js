import FoodRepository from '../repositories/foodrepository';
import PubSub from '../services/pubsub';

const FoodStore = (function () {
    /*
     * private members
     */
    let foods = [];

    /*
     * public members
     */
    class FoodStore {
        constructor() {
            this.fetchFoods();
        }

        getFoods() {
            return foods.sort((i1, i2) => {
                return i1.calories - i2.calories;
            });
        }

        fetchFoods = () => {
            FoodRepository.fetchAllFoods().then((data) => {
                foods = data;
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
            });
        };

        addFood = (food) => {
            foods.push(food);
            FoodRepository.insertFood(food).then(() => {
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
            });
        };
    }
    return FoodStore;
})();

export default new FoodStore();
