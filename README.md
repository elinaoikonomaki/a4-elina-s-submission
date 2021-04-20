# a4-elina-s-submission
**Website**


**NOTE ABOUT THE SUBMISSION**

Elina submitted seperately from the initial group “megkiilina”.

The text of the narrative and dataset remain the same as with the original group “megkiilina” but the website and graph development as well as the interaction development in the repository is only part of Elina's submission.

**The dataset** (same as group “megkiilina”)

The dataset includes over 100 technologies in its collection, but many of the technologies have very sparse data across all the countries and years. We decided to focus on communications inventions because it seemed to follow naturally from thinking about worldwide adoption of technology, plus the data for 20th century communications inventions was some of the most dense available in the CHAT dataset.

**Filtering Nulls**

The dataset had many gaps with many years missing data for most of the countries. That was a particurlar challenge for filtering the nulls and designing correctly the line graphs. In the line graphs the missing data are shown as gaps in the lines for each technology. 

**Data filtering - different time periods**

For each technology, the line charts display a different year range. The population is the exception showing the population for each country.
The Telephone Line Chart year range is [1876 -2000].
The Radio Line Chart year range is [1920 -2000].
The Cellular Line Chart phone year range is [1980 -2000].
The Internet Line Chart year range is [1990 -2000].
The Population Line Chart year range is [1960 -2000].
The Internet Line Chart year range is [1992 -2000].

**Website and Graphs Interactions**

The webpage is divided into sections for each technology, each containing two columns. The left columns contains the narrative with the historical events and the technologies and the right columns contains the different line graphs for each technology. When scrolling up/down sections of the narrative appear and disappear respectively to the timeline.  

**Switch between Line Charts**

The right column contains two different line charts for each technology, one showing the technology vs GDP and the other showing the technology vs YEAR. The population is the exception showing the population for each country instead of the technology on the y-axis. The two buttons on the top left allow for switching between the different line charts for each section. 

**Line Charts**

Each technology has two different line charts, one with GDP on x-axis and the other with Year on the x-axis. The GDP chart is designed to show the discrepancies between the growth in GDP and the distribution of technology. The YEAR chart is designed to show the distribution of technology over time for selected time periods. The GDP and the technologies, are presented in log scale. Each country is displayed with a different line color which also corresponds with the legend. Missing data are presented with gaps on the line. 

**Line Charts Interactions**

When hovering on the lines,the selected country in the line chart as well as in the legend is highlighted and the rest of the countries fade out. On the Year Line chart, the data for each technology is presented as a tooltip when hovering on a specific country - line for each data point. On the GDP Line chart, the tooltip presents the year for each data point for each country. 

**Legend Interactions**

The legend contains the country names but is also used as a way of filtering the countries. When clicking on a country rectangle in the legend, the corresponding line is turned off and on. With this feature, viewers can select which countries they would like to view and compare.  

