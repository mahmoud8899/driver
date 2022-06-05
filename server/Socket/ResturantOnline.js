let Resturant = [];

const ResturantAddUser = (userId, socketId) => {
    !Resturant.some((user) => user.userId === userId) &&
    Resturant.push({ userId, socketId });
};

const ResturantRemoveUser = (socketId) => {
    Resturant = Resturant.filter((user) => user.socketId !== socketId);
};

const ResturantGetUser = (userId) => {
    return Resturant.find((user) => user.userId === userId);
};




module.exports = {
    Resturant,
    ResturantAddUser,
    ResturantRemoveUser,
    ResturantGetUser,
}