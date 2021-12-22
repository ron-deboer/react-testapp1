import FoodStore from '../stores/foodstore';
import FormField from '../components/FormField';
import { Link } from 'react-router-dom';
import PubSub from '../services/pubsub';

export default function Addfood(props) {
    const { getfoods, addfood, loadfoods } = FoodStore;

    let food = {
        category: '',
        name: '',
        calories: '',
        carbs: '',
    };
    const form = [
        { name: 'category', label: 'Category', type: 'text', isRequired: true, minlength: 3 },
        { name: 'name', label: 'Name', type: 'text', isRequired: true, minlength: 3 },
        { name: 'calories', label: 'Calories per 100g', type: 'number', isRequired: true, minlength: 1 },
        { name: 'carbs', label: 'Carbs per 100g', type: 'number', isRequired: true, minlength: 1 },
    ];
    const onSubmit = () => {
        let errors = '';
        const collection = document.querySelectorAll('#addfoodform input');
        collection.forEach((item) => {
            item.focus();
            item.blur();
            errors += item.getAttribute('errors');
        });
        if (errors !== '') {
            setTimeout(() => {
                PubSub.emit(PubSub.topic.SHOW_SNACKBAR, {
                    type: 'error',
                    text: 'Fix errors then submit again',
                });
            }, 50);
        } else {
            PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'success', text: 'Add food Success' });
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
                    FOOD LIST
                </Link>
            </div>
        </div>
    );
}
