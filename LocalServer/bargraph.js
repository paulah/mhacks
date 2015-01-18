$(function () {
    var callMap = getGraphStats();
    var likeCount = callMap['happy'];
    var dislikeCount = callMap['sad'];
    var questionCount = callMap['question'];
    var surpirseCount = callMap['exclamation'];


    $('#container').highcharts({

        

        chart: {
            type: 'column'
        },
        title: {
            text: 'graph'
        },
        xAxis: {
            categories: [
                'current second',
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Clicks'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} clicks</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: ':)',
            data: [likeCount]

        }, {
            name: ':(',
            data: [dislikeCount]

        }, {
            name: '?',
            data: [questionCount]

        }, {
            name: '!',
            data: [surpirseCount]

        }]
    });
});