window.onload = getJson();

function getJson() {


    // let url = "/data.json";
    fetch('data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let output = '';
            let i = 2;
            var table = document.getElementById("myTable");

            //sorting 
            var sortedData = data.slice(0);
            sortedData.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });

            let max = 0;

            sortedData.forEach(function (post) {
                let total = parseInt(post.marks.Maths) + parseInt(post.marks.English) + parseInt(post.marks.Science);
                if (max < total)
                    max = total;
            });

            sortedData.forEach(function (post) {
                let total = parseInt(post.marks.Maths) + parseInt(post.marks.English) + parseInt(post.marks.Science);

                var para = document.createElement("P"); // Create a <p> element

                var t;


                var row = table.insertRow(i);

                //checking pass ,fail or topper

                if (post.marks.Maths >= 20 && post.marks.English >= 20 && post.marks.Science >= 20) {
                    // para.className = "green";



                    if (total == max) {
                        t = document.createTextNode("Topper");

                        para.appendChild(t);
                        row.className = "green";
                    } else {
                        t = document.createTextNode("Pass");

                        para.appendChild(t);


                    }



                    //para.style.color 
                } else {
                    // para.className = "red";
                    t = document.createTextNode("Fail"); // Create a text node
                    t.className = "red";
                    para.appendChild(t);
                    row.className = "red";
                    //para.style.color = Red;
                }

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = post.name.substring(0, 1).toUpperCase() + post.name.substring(1);
                cell2.innerHTML = post.rollNumber;
                cell3.innerHTML = total;
                cell4.innerHTML = t.nodeValue;


                output += row;
                i++;
            });
            document.getElementsByClassName('data').innerHTML = output;
        })
        .catch(function (err) {
            console.log(err);
        });
}