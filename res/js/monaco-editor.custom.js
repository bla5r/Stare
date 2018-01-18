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

var diffViewer = null;

var originalFile = null;
var originalFileLang = null;

var modifiedFile = null;
var modifiedFileLang = null;

function xhr(url) {
	var req = null;
	return new monaco.Promise(function(c,e,p) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req._canceled) { return; }

			if (req.readyState === 4) {
				if ((req.status >= 200 && req.status < 300) || req.status === 1223) {
					c(req);
				} else {
					e(req);
				}
				req.onreadystatechange = function () { };
			} else {
				p(req);
			}
		};

		req.open("GET", url, true );
		req.responseType = "";

		req.send(null);
	}, function () {
		req._canceled = true;
		req.abort();
	});
}

function updateView() {
	if (diffViewer != null
		&& originalFile != null && originalFileLang != null
		&& modifiedFile != null && modifiedFileLang != null) {
		diffViewer.setModel({
			original: monaco.editor.createModel(originalFile, originalFileLang),
			modified: monaco.editor.createModel(modifiedFile, modifiedFileLang),
		});
	}
}

function loadOriginalFile(url, lang) {
	if (diffViewer != null) {
		monaco.Promise.join([xhr(url)]).then(function(r) {
			originalFile = r[0].responseText;
			originalFileLang = lang;
			updateView();
		});
	}
}

function loadModifiedFile(url, lang) {
	if (diffViewer != null) {
		monaco.Promise.join([xhr(url)]).then(function(r) {
			modifiedFile = r[0].responseText;
			modifiedFileLang = lang;
			updateView();
		});
	}
}

function loadBothFiles(urlOriginal, langOriginal, urlModified, langModified) {
	if (diffViewer != null) {
		monaco.Promise.join([xhr(urlOriginal), xhr(urlModified)]).then(function(r) {
			originalFile = r[0].responseText;
			originalFileLang = langOriginal;
			modifiedFile = r[1].responseText;
			modifiedFileLang = langModified;
			updateView();
		});
	}
}

function createViewer() {
	monaco.editor.setTheme("vs-dark");
	diffViewer = monaco.editor.createDiffEditor(document.getElementById('container'));
}

require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], createViewer);