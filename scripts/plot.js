function plot(y){
    const element = document.getElementById('plot-container');
    let contentsBounds = element.getBoundingClientRect();
    let width = 468;
    let height = 432;
    let ratio = contentsBounds.width / width;
    width *= ratio;
    height *= ratio;

    functionPlot({
        target: "#plot-container",
        width,
        height,
        yAxis: { domain: [-1, 10], label: 'y'},
        xAxis: { domain: [-5, 5], label: 'x'},
        grid: true,
        data: [
            {
            fn: y,
            }
        ]
    });
}