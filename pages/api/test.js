const mmm = async (req, res) => {
    console.log("req");
    
    res.json(
        [
            {id: 1, name: "HEWSTORE", numUses: "100000", validPeriod: 360, discount: 100},
            {id: 2, name: "OPEN", numUses: "Бесконечно", validPeriod: 24, discount: 25},
        ]
    );


}

export default mmm;