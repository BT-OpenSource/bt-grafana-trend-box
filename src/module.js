import './module.css!'
import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'

const panelDefaults = {
  defaultColor: 'rgb(117, 117, 117)',
  displayValue: 'value',
  titleSize: '20px',
  percentSize: '30px',
  numberSize: '14px',
  thresholds: [],
  format: 'none',
  decimals: 2
}

export class TrendBoxCtrl extends MetricsPanelCtrl {
  constructor ($scope, $injector, linkSrv) {
    super($scope, $injector)
    _.defaults(this.panel, panelDefaults)

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))

    this.builder = new Builder(this.panel)
    this.presenter = new Presenter(this.panel)

    this.box = {}
    this.linkSrv = linkSrv
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
    this.presenter.call(this.box)

    this.panelContainer.css('background-color', this.box.color)
    this.panelTitle.css('font-size', this.panel.titleSize)
    this.boxContainer.toggleClass('pointer', this.panel.links && this.panel.links.length > 0)
  }

  onEditorSetFormat (subitem) {
    this.panel.format = subitem.value
    this.render()
  }

  onEditorAddThreshold () {
    this.panel.thresholds.push({ value: 0, color: this.panel.defaultColor })
    this.render()
  }

  onEditorRemoveThreshold (index) {
    this.panel.thresholds.splice(index, 1)
    this.render()
  }

  onClick () {
    if (this.panel.links === null) return
    if (this.panel.links.length === 0) return

    var linkInfo = this.linkSrv.getPanelLinkAnchorInfo(
      this.panel.links[0], this.panel.scopedVars)

    if (linkInfo.target === '_blank') {
      window.open(linkInfo.href, '_blank')
    } else {
      window.location.href = '/' + linkInfo.href
    }
  }

  format (value, format = this.panel.format) {
    var formatFunc = kbn.valueFormats[format]
    return formatFunc(value, this.panel.decimals, null)
  }

  link (scope, elem, attrs, ctrl) {
    this.panelContainer = elem.find('.panel-container')
    this.boxContainer = elem.find('.box')
    this.panelTitle = elem.find('.panel-title')
    this.boxContainer.on('click', this.onClick.bind(this))
  }
}

TrendBoxCtrl.templateUrl = 'module.html'
export { TrendBoxCtrl as PanelCtrl }
