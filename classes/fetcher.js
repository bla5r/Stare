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

const fs = require("fs");

class fetcher {

	static get() {
		var html = "<option value=\"none\" disabled selected>Project</option>";
		var baseDir = "projects/";
		var files = fs.readdirSync(baseDir);
		files.forEach(function(project) {
			var projectDir = baseDir + project;
			if (fs.lstatSync(projectDir).isDirectory()) {
				try {
					var config = JSON.parse(fs.readFileSync(projectDir + "/.stare_project.json", 'utf8'));
					html += "<option value=\"" + project + "\" data-name=\"" + config.name + "\" data-version=\"" + config.version + "\" data-lang=\"" + config.lang + "\">["+config.version+"] " + config.name + " - " + config.lang + "</option>";
				}
				catch (e) {
					console.log("[ERROR] " + projectDir + ": Unable to load - not a valid project");
				}
			}
		});
		return (html);
	}

}

module.exports = fetcher;