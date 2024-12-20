import {Serializer} from "./Serializer";
import {sizeof} from "sizeof";
import ScatterPlot from "console-scatter-plot";
import isEqual from "lodash.isequal";

const instanceSerializer = new Serializer();

const arrayLength = 1000;
const elementValueMin = 1;
const elementValueMax = 300;

const array = instanceSerializer.getRandom(arrayLength, elementValueMin, elementValueMax);
const encodeString = instanceSerializer.getString(array);

console.log(isEqual(array, instanceSerializer.decode(encodeString)));

[0, Number.MAX_SAFE_INTEGER].forEach((value) => {
    console.log("Values: %s", value);
    (new ScatterPlot({
        xAxis: {label: "The size of the array"},
        yAxis: {label: "Compression ratio"},
        points: instanceSerializer.getPlot(sizeof, value).map(
            pointObject => ({
                ...pointObject,
                marker: "+",
                color: "red",
            })
        ),
    })).print();
});


