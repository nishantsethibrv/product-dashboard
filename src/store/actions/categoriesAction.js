export const storeCategories = (cat) => {
    // console.log(cat, "cat");
    return {
        type: "STORE_CATEGORIES",
        payload: cat,
    }
}