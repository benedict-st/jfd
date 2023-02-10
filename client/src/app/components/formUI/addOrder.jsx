import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControll from "../shared/inputFieldControl";
import SelectFieldControll from "../shared/selectFieldControl";
import TextAreaFieldControl from "../shared/textAreaFieldControl";
import RadioField from "../shared/radioFieldControl";
import Button from "../ui/button";
import { controlledFormSchemaOrder } from "../../utils/validator";
import "../../style/forma.css";
import { useSelector, useDispatch } from "react-redux";
import { addOrders } from "../../store/orders";
import { getProducts, getProductsLoadingStatus } from "../../store/products";
import {
    getCategoriesList,
    getCategoriesLoadingStatus
} from "../../store/categories";
import { getUsersList, getIsLoggedIn } from "../../store/users";
import moment from "moment";
import { customAlphabet } from "nanoid";
export default function AddOrder() {
    const {
        handleSubmit,
        formState: { isValid },
        reset,
        control,
        watch
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(controlledFormSchemaOrder)
    });
    const watchCategory = watch("category");
    useEffect(() => {
        return () => watch();
    }, [watch]);

    const isLoadingCurrentUser = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getUsersList())[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = "himself";
    const [deliveryType, setDeliveryType] = useState(
        type === "himself" ? type : "delivery"
    );
    const toggleFormType = () => {
        setDeliveryType((prevState) =>
            prevState === "himself" ? "delivery" : "himself"
        );
    };

    if (isLoadingCurrentUser) {
        const categories = useSelector(getCategoriesList());
        const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
        let categoriesList = {};
        if (!isLoadingCategories) {
            categoriesList = categories.map((q) => ({
                label: q.name,
                value: q._id
            }));
        }
        const products = useSelector(getProducts());
        const isLoadingProducts = useSelector(getProductsLoadingStatus());

        let productsList = {};
        if (!isLoadingProducts) {
            const productsFilter = products.filter(
                (item) => item.category === watchCategory
            );
            productsList = productsFilter.map((q) => ({
                label: q.name,
                value: q._id
            }));
        }
        const nanoidIdOrder = customAlphabet("1234567890abcdef", 5);
        const onFormSubmit = (formData) => {
            const findProduct = products.find(
                (prod) => prod._id === formData.product
            );
            const newData = {
                idOrder: "CAKE-" + nanoidIdOrder(5),
                fio: currentUser.fio,
                phone: currentUser.phone,
                address: currentUser.address,
                deliveryType: deliveryType,
                himselfAdress: formData.himselfAdress,
                userID: currentUser._id,
                productId: formData.product,
                productName: findProduct.fullname,
                price: findProduct.price,
                kolvo: formData.kolvo,
                orderData: moment(formData.orderData).format("YYYY-MM-DD")
            };
            dispatch(addOrders(newData));
            reset();
            navigate(-1);
        };

        return (
            <>
                <section>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <SelectFieldControll
                            control={control}
                            label="Выбери категорию"
                            defaultOption="Сначала категорию..."
                            options={categoriesList}
                            name="category"
                        />
                        <SelectFieldControll
                            control={control}
                            label="Выбери продукт"
                            defaultOption="Теперь что то вкусное..."
                            options={productsList}
                            name="product"
                        />
                        <InputFieldControll
                            control={control}
                            labelTitle="Количество"
                            name="kolvo"
                            type="number"
                        />
                        <InputFieldControll
                            control={control}
                            labelTitle="Дата заказа"
                            name="orderData"
                            type="date"
                            min={moment(new Date())
                                .add(1, "days")
                                .format("YYYY-MM-DD")}
                            max={moment(new Date())
                                .add(7, "days")
                                .format("YYYY-MM-DD")}
                        />
                        <TextAreaFieldControl
                            control={control}
                            labelTitle="Пожелание"
                            name="moreInformation"
                            type="text"
                        />
                        <InputFieldControll
                            control={control}
                            labelTitle="ФИО"
                            name="fio"
                            type="text"
                            options={currentUser.fio}
                            disabled="disabled"
                        />
                        <InputFieldControll
                            control={control}
                            labelTitle="Телефон"
                            name="phone"
                            options={currentUser.phone}
                            type="text"
                            disabled="disabled"
                        />
                        <p>
                            <a
                                role="button"
                                className="secondary-btn"
                                onClick={toggleFormType}
                            >
                                <span>Изменить способ доставки?</span>
                            </a>
                        </p>
                        {deliveryType === "himself" ? (
                            <>
                                <RadioField
                                    options={[
                                        {
                                            name: "г. Белгород ул.Попова, 2А (мы работаем с 9-17)",
                                            value: "point1",
                                            checked: "point1"
                                        },
                                        {
                                            name: "г. Белгород Народный бульвар, 74 (мы работаем с 10-18)",
                                            value: "point2"
                                        }
                                    ]}
                                    control={control}
                                    name="himselfAdress"
                                    label="Заберу самостоятельно"
                                    type="radio"
                                />
                            </>
                        ) : (
                            <InputFieldControll
                                control={control}
                                labelTitle="Адрес доставки (можно изменить в профиле)"
                                name="address"
                                options={currentUser.address}
                                type="text"
                                disabled="disabled"
                            />
                        )}

                        <Button
                            type="submit"
                            className="submit_btn primary-btn"
                            disabled={!isValid}
                        >
                            Добавить заказ
                        </Button>
                    </form>
                </section>
            </>
        );
    }
}
