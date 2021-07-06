function dump(...args) {
    console.log(...args);
    process.exit(1);
}

module.exports = {
    dump
};
