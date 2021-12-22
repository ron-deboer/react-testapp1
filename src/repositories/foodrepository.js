import { db } from '../firebase-api';

const FoodRepository = (function () {
    /*
     * private members
     */
    const urls = {
        FoodList: '',
    };

    /*
     * public members
     */
    class FoodRepository {
        fetchAllFoods() {
            function transform(item, id) {
                return {
                    id: id,
                    name: item.Name,
                    category: item.Category,
                    calories: item.CaloriesPer100g,
                    carbs: item.CarbsPer100g,
                };
            }
            return new Promise(async function (resolve, reject) {
                const response = db.collection('Food');
                const data = await response.get();
                const resp = data.docs.map((item) => {
                    const row = transform(item.data(), item.id);
                    return row;
                });
                resolve(resp);
            });
        }
    }
    return FoodRepository;
})();

export default new FoodRepository();
