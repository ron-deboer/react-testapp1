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
            return foods;
        }

        fetchFoods = () => {
            FoodRepository.fetchAllFoods().then((data) => {
                foods = data;
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
            });
        };

        addFood = (food) => {
            this.foods.push(food);
        };
    }
    return FoodStore;
})();

export default new FoodStore();
