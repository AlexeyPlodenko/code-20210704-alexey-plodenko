function dump(...args) {
    console.trace(...args);
    process.exit(1);
}

module.exports = {
    dump
};
