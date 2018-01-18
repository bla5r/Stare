/*
 * This file is part of Stare.
 *
 * Copyright(c) 2018 bla5r
 * https://github.com/bla5r
 *
 * This file may be licensed under the terms of of the
 * GNU General Public License Version 2 (the ``GPL'').
 *
 * Software distributed under the License is distributed
 * on an ``AS IS'' basis, WITHOUT WARRANTY OF ANY KIND, either
 * express or implied. See the GPL for the specific language
 * governing rights and limitations.
 *
 * You should have received a copy of the GPL along with this
 * program. If not, go to http://www.gnu.org/licenses/gpl.html
 * or write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require('basic-auth-connect');
const config = require('config');
const explorer = require("./classes/explorer");
const fetcher = require("./classes/fetcher");

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/node_modules/monaco-editor/min/vs', express.static('./node_modules/monaco-editor/min/vs'))

app.use(basicAuth(config.get('user.login'), config.get('user.password')))

app.use('/', express.static('contents'))
app.use('/res', express.static('res'))
app.use('/projects', express.static('projects'))

app.post('/explore', function(req, res) {
	var html = explorer.get(req.body.dir);
    res.send(html);
});

app.post('/fetch', function(req, res) {
	var html = fetcher.get();
	res.send(html);
});

var server = app.listen(config.get('port'), function() {
    console.log("[INIT] Server is listening on port " + server.address().port);
});