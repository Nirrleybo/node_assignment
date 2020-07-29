exports.module = [
    {
        module_name: "alice",
        dependencies: []
    },{
        module_name: "bob",
        dependencies: [
            "alice",
            "charlie"
        ]
    }
]