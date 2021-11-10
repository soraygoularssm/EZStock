import * as Comelink from 'comlink';
import axios from "axios";

var mw = {
  AllRows: {},
  ClientType: {},
  InstStat: {},
  InstHistory: {},
  refid: 0,
  heven: 0,
  RoundNo: 1,
  ChangeRowList: [],
  FiltersList: [],
  showingFiltersIndex: [0],
}

const fns = {
    fetchData() {
        return axios.get("/api/filters").then(response => Object.freeze(response.data)).catch((err) => console.log(err));
    },
    loadClientType() {
      axios({
            method: "POST",
            url:
              "/tsetmc/tsev2/data/ClientTypeAll.aspx",
            data: {
              t: "a",
            },
            headers: {
              "Content-Type": "text/json",
            },
          })
          .then((data) => {
            if (data.data.length == 0) {
              return;
            }
            var rows = data.data.split(";");
            var cols;
            var jd;
            for (var qpos = 0; qpos < rows.length; qpos++) {
              cols = rows[qpos].split(",");
              jd = {
                Buy_CountI: parseInt(cols[1], 10),
                Buy_CountN: parseInt(cols[2], 10),
                Buy_I_Volume: parseInt(cols[3], 10),
                Buy_N_Volume: parseInt(cols[4], 10),
                Sell_CountI: parseInt(cols[5], 10),
                Sell_CountN: parseInt(cols[6], 10),
                Sell_I_Volume: parseInt(cols[7], 10),
                Sell_N_Volume: parseInt(cols[8], 10),
              };
              mw.ClientType[cols[0]] = jd;
            }
            setTimeout(this.loadClientType, 60000);
          });
    },
    loadInstStat() {
        axios({
            method: "POST",
            url:
              "/tsetmc/tsev2/data/InstValue.aspx?t=a",
            headers: {
              "Content-Type": "text/json",
            },
          })
          .then((data) => {
            var InsCode = "";
            var rows = data.data.split(";");
            var cols;
            for (var qpos = 0; qpos < rows.length; qpos++) {
              cols = rows[qpos].split(",");
              if (cols.length == 3) {
                InsCode = cols[0];
                if (typeof mw.InstStat[InsCode] == "undefined") {
                  mw.InstStat[InsCode] = {};
                }
                mw.InstStat[InsCode][cols[1]] = parseFloat(cols[2]);
              } else {
                if (typeof mw.InstStat[InsCode] == "undefined") {
                  mw.InstStat[InsCode] = {};
                }
                mw.InstStat[InsCode][cols[0]] = parseFloat(cols[1]);
              }
            }
          });
    },
    loadInstHistory() {
      return axios({
        method: "POST",
        url:
          "/tsetmc/members/tsev2/data/ClosingPriceAll.aspx",
        headers: {
          "Content-Type": "text/json",
        },
      })
      .then((data) => {
        var InsCode = "";
        var rows = data.data.split(";");
        var cols;
        var offset;
        var days;
        for (var qpos = 0; qpos < rows.length; qpos++) {
          cols = rows[qpos].split(",");
          if (cols.length == 11) {
            InsCode = cols[0];
            offset = 1;
          } else {
            offset = 0;
          }
          days = parseInt(cols[offset], 10);
          if (typeof mw.InstHistory[InsCode] == "undefined") {
            mw.InstHistory[InsCode] = [];
          }
          mw.InstHistory[InsCode][days] = {
            PClosing: parseFloat(cols[offset + 1]),
            PDrCotVal: parseFloat(cols[offset + 2]),
            ZTotTran: parseFloat(cols[offset + 3]),
            QTotTran5J: parseFloat(cols[offset + 4]),
            QTotCap: parseFloat(cols[offset + 5]),
            PriceMin: parseFloat(cols[offset + 6]),
            PriceMax: parseFloat(cols[offset + 7]),
            PriceYesterday: parseFloat(cols[offset + 8]),
            PriceFirst: parseFloat(cols[offset + 9]),
          };
        }
      });
    
    },
    AddNewRowToStore(RowID, defaultData) {
      if (typeof mw.AllRows[RowID] == "undefined") {
        mw.AllRows[RowID] = defaultData;
      }
    },
    AddDataToStore(RowID, data) {
      if (typeof mw.AllRows[RowID] == "undefined") {
        return;
      }
      for (var key in data) {
        if (mw.AllRows[RowID][key] == data[key]) {
          mw.AllRows[RowID]["_" + key] = "0";
        } else {
          mw.AllRows[RowID]["_" + key] = "" + mw.RoundNo;
        }
        mw.AllRows[RowID][key] = data[key];
      }
    },
    ResetChangeInStore() {
      var ipos;
      var elm;
      for (ipos = 0; ipos < mw.ChangeRowList.length; ipos++) {
        elm = mw.AllRows[mw.ChangeRowList[ipos]];
        if (typeof elm != "undefined") {
          elm._heven = "0";
          elm._pc = "0";
          elm._pcc = "0";
          elm._pcp = "0";
          elm._pl = "0";
          elm._plc = "0";
          elm._plp = "0";
          elm._tno = "0";
          elm._tvol = "0";
          elm._tval = "0";
          elm._pmin = "0";
          elm._pmax = "0";
          elm._eps = "0";
          elm._pe = "0";
          elm._zo1 = "0";
          elm._zd1 = "0";
          elm._pd1 = "0";
          elm._po1 = "0";
          elm._qd1 = "0";
          elm._qo1 = "0";
          elm._zo2 = "0";
          elm._zd2 = "0";
          elm._pd2 = "0";
          elm._po2 = "0";
          elm._qd2 = "0";
          elm._qo2 = "0";
          elm._zo3 = "0";
          elm._zd3 = "0";
          elm._pd3 = "0";
          elm._po3 = "0";
          elm._qd3 = "0";
          elm._qo3 = "0";
        }
      }
      mw.ChangeRowList = [];
    },
    prepareFilterCode(RawCode) {
      var FilterCode = RawCode;
      FilterCode = FilterCode.replace(/\x28l18\x29/g, 'row["l18"]');
      FilterCode = FilterCode.replace(/\x28l30\x29/g, 'row["l30"]');
      FilterCode = FilterCode.replace(
        /\x28tno\x29/g,
        'parseInt(row["tno"],10)'
      );
      FilterCode = FilterCode.replace(
        /\x28tvol\x29/g,
        'parseInt(row["tvol"],10)'
      );
      FilterCode = FilterCode.replace(
        /\x28tval\x29/g,
        'parseInt(row["tval"],10)'
      );
      FilterCode = FilterCode.replace(/\x28py\x29/g, 'parseFloat(row["py"])');
      FilterCode = FilterCode.replace(/\x28pf\x29/g, 'parseFloat(row["pf"])');
      FilterCode = FilterCode.replace(
        /\x28pmin\x29/g,
        'parseFloat(row["pmin"])'
      );
      FilterCode = FilterCode.replace(
        /\x28pmax\x29/g,
        'parseFloat(row["pmax"])'
      );
      FilterCode = FilterCode.replace(/\x28pl\x29/g, 'parseFloat(row["pl"])');
      FilterCode = FilterCode.replace(/\x28plc\x29/g, 'parseFloat(row["plc"])');
      FilterCode = FilterCode.replace(/\x28plp\x29/g, 'parseFloat(row["plp"])');
      FilterCode = FilterCode.replace(/\x28pc\x29/g, 'parseFloat(row["pc"])');
      FilterCode = FilterCode.replace(/\x28pcc\x29/g, 'parseFloat(row["pcc"])');
      FilterCode = FilterCode.replace(/\x28pcp\x29/g, 'parseFloat(row["pcp"])');
      FilterCode = FilterCode.replace(/\x28eps\x29/g, 'parseFloat(row["eps"])');
      FilterCode = FilterCode.replace(/\x28pe\x29/g, 'parseFloat(row["pe"])');
      FilterCode = FilterCode.replace(/\x28pd1\x29/g, 'parseFloat(row["pd1"])');
      FilterCode = FilterCode.replace(/\x28zd1\x29/g, 'parseFloat(row["zd1"])');
      FilterCode = FilterCode.replace(/\x28qd1\x29/g, 'parseFloat(row["qd1"])');
      FilterCode = FilterCode.replace(/\x28po1\x29/g, 'parseFloat(row["po1"])');
      FilterCode = FilterCode.replace(/\x28zo1\x29/g, 'parseFloat(row["zo1"])');
      FilterCode = FilterCode.replace(/\x28qo1\x29/g, 'parseFloat(row["qo1"])');
      FilterCode = FilterCode.replace(/\x28pd2\x29/g, 'parseFloat(row["pd2"])');
      FilterCode = FilterCode.replace(/\x28zd2\x29/g, 'parseFloat(row["zd2"])');
      FilterCode = FilterCode.replace(/\x28qd2\x29/g, 'parseFloat(row["qd2"])');
      FilterCode = FilterCode.replace(/\x28po2\x29/g, 'parseFloat(row["po2"])');
      FilterCode = FilterCode.replace(/\x28zo2\x29/g, 'parseFloat(row["zo2"])');
      FilterCode = FilterCode.replace(/\x28qo2\x29/g, 'parseFloat(row["qo2"])');
      FilterCode = FilterCode.replace(/\x28pd3\x29/g, 'parseFloat(row["pd3"])');
      FilterCode = FilterCode.replace(/\x28zd3\x29/g, 'parseFloat(row["zd3"])');
      FilterCode = FilterCode.replace(/\x28qd3\x29/g, 'parseFloat(row["qd3"])');
      FilterCode = FilterCode.replace(/\x28po3\x29/g, 'parseFloat(row["po3"])');
      FilterCode = FilterCode.replace(/\x28zo3\x29/g, 'parseFloat(row["zo3"])');
      FilterCode = FilterCode.replace(/\x28qo3\x29/g, 'parseFloat(row["qo3"])');
      FilterCode = FilterCode.replace(
        /\x28bvol\x29/g,
        'parseInt(row["bvol"],10)'
      );
      FilterCode = FilterCode.replace(/\x28cs\x29/g, 'parseInt(row["cs"],10)');
      FilterCode = FilterCode.replace(
        /\x28tmax\x29/g,
        'parseFloat(row["tmax"])'
      );
      FilterCode = FilterCode.replace(
        /\x28tmin\x29/g,
        'parseFloat(row["tmin"])'
      );
      FilterCode = FilterCode.replace(/\x28z\x29/g, 'parseInt(row["z"],10)');
      FilterCode = FilterCode.replace(/\x28mv\x29/g, 'parseFloat(row["mv"])');
      FilterCode = FilterCode.replace(/\x28cfield0\x29/g, 'row["cfield0"]');
      FilterCode = FilterCode.replace(
        /\x28ct\x29/g,
        'mw.ClientType[row["inscode"]]'
      );
      FilterCode = FilterCode.replace(
        /\x5Bis/g,
        'mw.InstStat[row["inscode"]]['
      );
      FilterCode = FilterCode.replace(
        /\x5Bih\x5D/g,
        'mw.InstHistory[row["inscode"]]'
      );
      return FilterCode;
    },
    RenderData(showingFiltersIndex) {
      if (typeof showingFiltersIndex != "undefined") {
        mw.showingFiltersIndex = showingFiltersIndex
      }
      if (
        mw.InstHistory != {} &&
        mw.InstStat != {} &&
        mw.ClientType != {}
      ) {
        const FiltersResult = [];
        if (mw.showingFiltersIndex.length != 0) {
          for (var key in mw.AllRows) {
            var row = mw.AllRows[key];

            var FiltersStatus = true;
            try {
              if (typeof mw.ClientType[row.inscode] == "undefined") {
                mw.ClientType[row.inscode] = {
                  Buy_CountI: 0,
                  Buy_CountN: 0,
                  Buy_I_Volume: 0,
                  Buy_N_Volume: 0,
                  Sell_CountI: 0,
                  Sell_CountN: 0,
                  Sell_I_Volume: 0,
                  Sell_N_Volume: 0,
                };
              }

              for (var i = 0; i < mw.showingFiltersIndex.length; i++) {
              var FilterCode = this.prepareFilterCode(
                mw.FiltersList[mw.showingFiltersIndex[i]].filter
              );
              if (eval(FilterCode) == false) {
                FiltersStatus = false;
              }
              }
            } catch (e) {
              FiltersStatus = false;
            }
            if (FiltersStatus) {
              FiltersResult.push([row.l18, row.cfield0, key]);
            }
          }
        }
        this.ResetChangeInStore();

        return FiltersResult;
      } else {
        setTimeout(this.UpdateMarketWatch, 500);
      }
    },
    UpdateMarketWatch(FiltersList , showingFiltersIndex) {
      mw.FiltersList = FiltersList;
      mw.showingFiltersIndex = showingFiltersIndex;
      return axios({
        method: "POST",
        url:
          "/tsetmc/tsev2/data/MarketWatchPlus.aspx",
        // this.heven == 0
        //   ? "https://cors-anywhere.herokuapp.com/http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx"
        //   : ,
        data: {
          h: 5 * Math.floor(mw.heven / 5),
          r: 25 * Math.floor(mw.refid / 25),
        },
        headers: {
          "Content-Type": "text/html",
        },
      })
      .then((data) => {
        if (++mw.RoundNo > 8) {
          mw.RoundNo = 1;
        }
        var all = data.data.split("@");

        var InstPrice = all[2].split(";");

        for (var ipos = 0; ipos < InstPrice.length; ipos++) {
          var col = InstPrice[ipos].split(",");
          var RowID = col[0];
          if (col.length == 10) {
            if (typeof mw.AllRows[RowID] != "undefined") {
              var py = parseInt(mw.AllRows[RowID]["py"]);
              var eps = mw.AllRows[RowID]["eps"];
              this.AddDataToStore(RowID, {
                heven: col[1],
                pf: col[2],
                pc: col[3],
                pcc: "" + parseInt(col[3]) - py,
                pcp:
                  "" + Math.round((100 * (parseInt(col[3]) - py)) / py) / 100,
                pl: col[4],
                plc: col[5] == "0" ? "0" : "" + parseInt(col[4]) - py,
                plp:
                  col[5] == "0"
                    ? "0"
                    : "" +
                      Math.round((100 * (parseInt(col[4]) - py)) / py) / 100,
                tno: col[5],
                tvol: col[6],
                tval: col[7],
                pmin: col[8],
                pmax: col[9],
                pe:
                  eps == ""
                    ? ""
                    : Math.round(parseInt(col[4]) / parseInt(eps)) / 100,
                render: "",
                preview: "",
              });
              mw.ChangeRowList.push(RowID);
              if (mw.heven < parseInt(col[1])) {
                mw.heven = parseInt(col[1]);
              }
            }
          } else {
            this.AddNewRowToStore(RowID, {
              inscode: col[0],
              iid: col[1],
              l18: col[2],
              l30: col[3],
              py: col[13],
              bvol: col[15],
              visitcount: col[16],
              flow: col[17],
              cs: col[18],
              tmax: col[19],
              tmin: col[20],
              z: col[21],
              yval: col[22],
              zo1: "",
              zd1: "",
              pd1: "",
              po1: "",
              qd1: "",
              qo1: "",
              _zo1: "",
              _zd1: "",
              _pd1: "",
              _po1: "",
              _qd1: "",
              _qo1: "",
              zo2: "",
              zd2: "",
              pd2: "",
              po2: "",
              qd2: "",
              qo2: "",
              _zo2: "",
              _zd2: "",
              _pd2: "",
              _po2: "",
              _qd2: "",
              _qo2: "",
              zo3: "",
              zd3: "",
              pd3: "",
              po3: "",
              qd3: "",
              qo3: "",
              _zo3: "",
              _zd3: "",
              _pd3: "",
              _po3: "",
              _qd3: "",
              _qo3: "",
              render: "",
              preview: "",
              cfield0: "",
            });
            this.AddDataToStore(RowID, {
              heven: col[4],
              pf: col[5],
              pc: col[6],
              pcc: "" + parseInt(col[6]) - parseInt(col[13]),
              pcp:
                "" +
                Math.round(
                  (100 * (parseInt(col[6]) - parseInt(col[13]))) /
                    parseInt(col[13])
                ) /
                  100,
              pl: col[7],
              plc:
                col[8] == "0"
                  ? "0"
                  : "" + parseInt(col[7]) - parseInt(col[13]),
              plp:
                col[8] == "0"
                  ? "0"
                  : "" +
                    Math.round(
                      (100 * (parseInt(col[7]) - parseInt(col[13]))) /
                        parseInt(col[13])
                    ) /
                      100,
              tno: col[8],
              tvol: col[9],
              tval: col[10],
              pmin: col[11],
              pmax: col[12],
              eps: col[14],
              pe:
                col[14] == ""
                  ? ""
                  : Math.round(parseInt(col[6]) / parseInt(col[14])) / 100,
            });
            mw.ChangeRowList.push(RowID);
            if (mw.heven < parseInt(col[4])) {
              mw.heven = parseInt(col[4]);
            }
          }
        }

        var BestLimit = all[3].split(";");

        for (ipos = 0; ipos < BestLimit.length; ipos++) {
          col = BestLimit[ipos].split(",");
          RowID = col[0];
          if (typeof mw.AllRows[RowID] == "undefined") {
            continue;
          }
          switch (col[1]) {
            case "1":
              data = {
                zo1: col[2],
                zd1: col[3],
                pd1: col[4],
                po1: col[5],
                qd1: col[6],
                qo1: col[7],
                render: "",
                preview: "",
              };
              break;
            case "2":
              data = {
                zo2: col[2],
                zd2: col[3],
                pd2: col[4],
                po2: col[5],
                qd2: col[6],
                qo2: col[7],
                render: "",
                preview: "",
              };
              break;
            case "3":
              data = {
                zo3: col[2],
                zd3: col[3],
                pd3: col[4],
                po3: col[5],
                qd3: col[6],
                qo3: col[7],
                render: "",
                preview: "",
              };
              break;
          }
          this.AddDataToStore(RowID, data);
          mw.ChangeRowList.push(RowID);
        }

        if (all[4] != "0" && parseInt(all[4]) > mw.refid) {
          mw.refid = parseInt(all[4]);
        }
      })
      .then(() => this.RenderData())
      .catch((e) => {
        console.log(e);
        setTimeout(this.UpdateMarketWatch, 500);
      });
    },
}

Comelink.expose(fns);