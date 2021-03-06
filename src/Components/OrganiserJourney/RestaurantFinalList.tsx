import Boxes from '../../CSS/Boxes.module.css';
import Paragraphs from '../../CSS/Paragraphs.module.css';
import { useEffect, useState } from 'react';
import { saveEvent } from '../../API-Funcs/API';
import Datetime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';
import { IUser, IYelpRestaurant } from '../Interfaces/Interfaces';
import { extractRestaurantInfo } from '../../Utils/Utils';

interface Props {
    restaurantShortlist: IYelpRestaurant[];
    setRestaurantShortlist: any;
    setReviewingShortlist: (val: boolean) => void;
    setEventConfirmed: (val: boolean) => void;
    loggedInUser: IUser | null;
    eventName: string;
    setEventName: (val: string) => void;
    nameChosen: boolean;
    setNameChosen: (val: boolean) => void;
}

const RestaurantFinalList = (props: Props) => {
    type ClickEvent = React.MouseEvent<HTMLButtonElement>;
    type SubmitEvent = React.FormEvent<HTMLFormElement>;
    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    const [eventClosingDate, setEventClosingDate] = useState<Date>();
    const setEndTime = (time: any) => {
        setEventClosingDate(time._d);
    };
    useEffect(() => {
        let d = new Date();
        d.setHours(d.getHours() + 3);
        setEventClosingDate(d);
    }, []);
    const [eventNameInput, setEventNameInput] = useState('');
    // const [nameChosen, setNameChosen] = useState(false); //used to toggle between name input form and displaying the chosen name

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        props.setEventName(eventNameInput);
        props.setNameChosen(true);
    };

    const handleChange = (e: InputEvent) => {
        setEventNameInput(e.target.value);
    };
    const handleConfirmSelection = (e: ClickEvent) => {
        e.preventDefault();

        if (
            props.eventName.length >= 3 &&
            props.restaurantShortlist.length > 1
        ) {
            const restaurantList = extractRestaurantInfo(
                props.restaurantShortlist
            ); //turns the shortlist into a proper object to enter into database
            saveEvent({
                eventName: props.eventName,
                organiser: props.loggedInUser?.name,
                endDate: eventClosingDate,
                restaurantList: restaurantList,
            })
                .then(() => {
                    props.setReviewingShortlist(false);
                    props.setEventConfirmed(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            //do proper error message later
            alert(
                'Event name must be longer than 2 chars and have at least 2 restaurants in shortlist'
            );
        }
    };
    const createStars = (rating: number) => {
        const fullStars = Math.floor(rating / 1);
        const halfStars = rating % 1;

        const fullStarIcon = <i className="fas fa-star"></i>;
        const halfStarIcon = <i className="fas fa-star-half-alt"></i>;
        const emptyStarIcon = <i className="far fa-star"></i>;

        let stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(fullStarIcon);
        }

        if (halfStars === 0.5) stars.push(halfStarIcon);
        while (stars.length < 5) stars.push(emptyStarIcon);

        return (
            <div className="rating-star-container">
                {stars.map((star) => {
                    return star;
                })}
            </div>
        );
    };

    return (
        <section>
            <p className="page-header page-header-shortlist">Shortlist</p>

            {/* //enter name or display chosen name // */}
            {!props.nameChosen ? (
                <>
                    <label
                        htmlFor="eventName"
                        className="input-label-shortlist input-label-shortlist-choose"
                    >
                        Please choose a name for your event
                    </label>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input-textbox-shortlist"
                            value={eventNameInput}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Event Name"
                        ></input>
                        <input
                            className="primary-button-reviewlist"
                            type="submit"
                            value="Set name..."
                        />
                    </form>{' '}
                </>
            ) : (
                <>
                    <p className={Paragraphs['summary-event-name']}>
                        {props.eventName}
                    </p>
                    <button
                        className="primary-button-reviewlist"
                        onClick={() => props.setNameChosen(false)}
                    >
                        Edit Name
                    </button>
                </>
            )}

            {/* //display the short list// */}
            {props.restaurantShortlist.map((restaurant: any) => {
                return (
                    <div
                        key={restaurant.id}
                        className={Boxes['shortlisted-restaurant-container']}
                    >
                        {restaurant.categories.some(
                            (category: any) =>
                                category.title === 'Vegan' ||
                                category.title === 'Vegetarian'
                        ) && (
                            <p className={Paragraphs['veggie-icon']}>
                                <i className="fas fa-leaf"></i>
                            </p>
                        )}

                        <p
                            className={
                                Paragraphs['shortlisted-restaurant-info']
                            }
                        >
                            {restaurant.name} -{' '}
                            {(restaurant.distance / 1000).toFixed(2)}
                            km
                            <br />
                            {createStars(restaurant.rating)}
                        </p>
                        <p
                            onClick={() => {
                                props.setRestaurantShortlist(
                                    (currShortlist: any) => {
                                        const newShortList = [...currShortlist];
                                        const index = newShortList.findIndex(
                                            (rest: any) =>
                                                rest.id === restaurant.id
                                        );
                                        newShortList.splice(index, 1);
                                        return newShortList;
                                    }
                                );
                            }}
                            className={Paragraphs['delete-icon']}
                        >
                            <i className="fas fa-trash"></i>
                        </p>
                    </div>
                );
            })}
            <form>
                <p className="input-label"> Please add event vote deadline </p>
                <Datetime
                    className="final-list-datetime"
                    onChange={setEndTime}
                />
                ;
            </form>
            <div className="final-list-buttons-container">
                <button
                    className="secondary-button-reviewlist"
                    onClick={() => props.setReviewingShortlist(false)}
                >
                    Add more restaurants
                </button>
                <button
                    className="primary-button-reviewlist"
                    onClick={handleConfirmSelection}
                >
                    Confirm selection
                </button>
            </div>
        </section>
    );
};

export default RestaurantFinalList;
