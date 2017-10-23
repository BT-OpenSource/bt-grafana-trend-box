# Grafana Trend Box

A trend box panel for [Grafana](http://grafana.org/).

![Trend Box Panel](https://raw.githubusercontent.com/BT-OpenSource/bt-grafana-trend-box/master/src/img/trend_box.png)

## Overview

This panel shows the percentage change between the first and last values of a series. This is useful if you want to to monitor a value as it changes over time. The panel can also work with multiple series by adding together the values at each end. Options for this panel include variable font sizes, precision and units; a drilldown link for the entire panel; and color thresholds for the percentage change.

## Compatibility

This panel should work with the following data sources: [Graphite](https://grafana.net/plugins/graphite).

## Development

[Docker](https://www.docker.com/) is an easy way to spin-up an instance of Grafana. With docker installed, run the following command in the directory containing the plugin; this will expose the local plugin on your machine to the Grafana container so you can test it out.

    docker run -it -v $PWD:/var/lib/grafana/plugins/trend_box -p 3000:3000 --name grafana.docker grafana/grafana

Now do this...

    # Install development packages
    npm install

    # Install the grunt-cli
    sudo npm install -g grunt-cli

    # Compile into dist/
    grunt

    # Restart Grafana to see it
    docker restart grafana.docker

    # Watch for changes (requires refresh)
    grunt watch

Use `grunt test` to run the Jasmine tests for the plugin; and `grunt eslint` to check for style issues. Note that the plugin controller isn't tested because it depends on Grafana native libraries, which aren't available outside of Grafana.

## Contributing

For bugs and new features, open an issue and we'll take a look. If you want to contribute to the plugin, you're welcome to submit a pull request - just make sure `grunt` runs without errors first.
