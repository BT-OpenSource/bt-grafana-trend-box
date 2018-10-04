import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'
import {Linker} from './util/linker'
import {Formatter} from './util/formatter'
import {Styler} from './util/styler'

const panelDefaults = {
  defaultColor: 'rgb(117, 117, 117)',
  linkIndex: '0',
  displayValue: 'value',
  titleSize: '20px',
  percentSize: '30px',
  numberSize: '14px',
  thresholds: [],
  format: 'none',
  decimals: 2
}

export class PanelCtrl extends MetricsPanelCtrl {
  constructor ($scope, $injector, linkSrv) {
    super($scope, $injector)
    _.defaults(this.panel, panelDefaults)

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))

    this.builder = new Builder(this.panel)
    this.presenter = new Presenter(this.panel)
    this.linker = new Linker(this.panel, linkSrv)
    this.formatter = new Formatter(this.panel, kbn)
    this.styler = new Styler(this.panel)

    this.box = {}
  }

  onInitEditMode () {
    this.addEditorTab('Options', 'public/plugins/btplc-trend-box-panel/editor.html')
    this.unitFormats = kbn.getUnitFormats()
  }

  onDataReceived (seriesList) {
    this.seriesList = seriesList
    this.render()
  }

  onRender () {
    this.box = this.builder.call(this.seriesList)
    this.linker.call(this.box)
    this.presenter.call(this.box)
    this.formatter.call(this.box)
    this.styler.call(this.box, this.container, this.title, this.header, this.menu)
  }

  onEditorSetFormat (subitem) {
    this.panel.format = subitem.value
    this.render()
  }

  onEditorAddThreshold () {
    this.panel.thresholds.push({ color: this.panel.defaultColor })
    this.render()
  }

  onEditorRemoveThreshold (index) {
    this.panel.thresholds.splice(index, 1)
    this.render()
  }

  link (scope, elem, attrs, ctrl) {
    this.container = elem.find('.panel-container')
    this.title = elem.find('.panel-title')
    this.header = elem.find('.panel-header')
    this.menu = elem.find('.dropdown-menu')
  }
}

PanelCtrl.templateUrl = 'module.html'
