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

class explorer {

	static get(dir) {
		if (dir.substr(0, 11).indexOf("projects/") == -1) {
			return("");
		}
		var r = '<ul class="fileTree"">';
   		try {
       		var r = '<ul class="fileTree"">';
			var files = fs.readdirSync(dir);
			files.forEach(function(f) {
				var ff = dir + f;
				var stats = fs.statSync(ff)
            	if (stats.isDirectory()) { 
               		r += '<li class="directory collapsed"><a href="#" rel="' + ff  + '/">' + f + '</a></li>';
            	}
            	else {
            		if (f != ".stare_project.json") {
            			var e = f.split('.')[1];
             			r += '<li class="file ext_' + e + '"><a href="#" rel='+ ff + '>' + f + '</a></li>';
             		}
            	}
			});
			r += '</ul>';
		} catch(e) {
			r += 'Could not load directory: ' + e;
			r += '</ul>';
		}
		return(r)
	}

}

module.exports = explorer;