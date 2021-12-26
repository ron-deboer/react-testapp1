import { db } from '../firebase-api';

const FoodRepository = (function () {
    /*
     * private members
     */
    const COLLECTION_NAME = 'Food';
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
                const collObj = db.collection(COLLECTION_NAME);
                const data = await collObj.get();
                const resp = data.docs.map((item) => {
                    const row = transform(item.data(), item.id);
                    return row;
                });
                resolve(resp);
            });
        }

        insertFood(item) {
            function transform(item) {
                return {
                    Name: item.name,
                    Category: item.category,
                    CaloriesPer100g: item.calories,
                    CarbsPer100g: item.carbs,
                };
            }
            const doc = transform(item);
            return new Promise(async function (resolve, reject) {
                const collObj = db.collection(COLLECTION_NAME);
                const resp = await collObj.add(doc);
                resolve(true);
            });
        }

        updateFood(item) {
            function transform(item) {
                return {
                    Name: item.name,
                    Category: item.category,
                    CaloriesPer100g: item.calories,
                    CarbsPer100g: item.carbs,
                };
            }
            const doc = transform(item);
            return new Promise(async function (resolve, reject) {
                let docObj = db.collection(COLLECTION_NAME).doc(`${item.id}`);
                const resp = await docObj.update(doc);
                resolve(true);
            });
        }
    }
    return FoodRepository;
})();

export default new FoodRepository();
