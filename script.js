class Lengths extends React.Component {
  constructor(props) {
    super(props);
    this.updateBreak = this.updateBreak.bind(this);
    this.updateSession = this.updateSession.bind(this);
  }

  updateBreak(e) {
    let decrementValue = this.props.breakLength - 1;
    let incrementValue = this.props.breakLength + 1;

    if (e.target.id === 'break-decrement' && this.props.breakLength > 1) {
      this.props.updateBreakLength(decrementValue);
    } else if (e.target.id === 'break-increment' && this.props.breakLength < 60) {
      this.props.updateBreakLength(incrementValue);
    }
  }

  updateSession(e) {
    let decrementValue = this.props.sessionLength - 1;
    let incrementValue = this.props.sessionLength + 1;

    if (e.target.id === 'session-decrement' && this.props.sessionLength > 1) {
      this.props.updateSessionLength(decrementValue);
      this.props.updateTimeLeft(decrementValue, 0);
    } else if (e.target.id === 'session-increment' && this.props.sessionLength < 60) {
      this.props.updateSessionLength(incrementValue);
      this.props.updateTimeLeft(incrementValue, 0);
    }

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "actions", class: "container" }, /*#__PURE__*/
      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "break", class: "col-sm-6 length-card" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label", class: "label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { id: "break-actions" }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-minus fa-lg", id: "break-decrement", onClick: this.updateBreak }), /*#__PURE__*/
      React.createElement("div", { id: "break-length", class: "label" }, this.props.breakLength), /*#__PURE__*/
      React.createElement("i", { class: "fas fa-plus fa-lg", id: "break-increment", onClick: this.updateBreak }))), /*#__PURE__*/


      React.createElement("div", { id: "session", class: "col-sm-6 length-card" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label", class: "label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { id: "session-actions" }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-minus fa-lg", id: "session-decrement", onClick: this.updateSession }), /*#__PURE__*/
      React.createElement("div", { id: "session-length", class: "label" }, this.props.sessionLength), /*#__PURE__*/
      React.createElement("i", { class: "fas fa-plus fa-lg", id: "session-increment", onClick: this.updateSession }))))));





  }}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.timeToDisplay = this.timeToDisplay.bind(this);
  }

  timeToDisplay() {
    let minutesToDisplay = this.props.timerLabel === 'Session' ?
    this.props.minutesLeft :
    this.props.breakMinutesLeft;

    let minutes = minutesToDisplay < 10 ? `0${minutesToDisplay}` : minutesToDisplay;
    let seconds = this.props.secondsLeft < 10 ? `0${this.props.secondsLeft}` : this.props.secondsLeft;

    return `${minutes}:${seconds}`;
  }

  render() {
    return /*#__PURE__*/(

      React.createElement("div", { id: "clock", class: "container" }, /*#__PURE__*/
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label", class: "label" }, this.props.timerLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.timeToDisplay()), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "http://soundbible.com/grab.php?id=1013&type=mp3", autoplay: "false" }))));



  }}


class ActivityButtons extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.timer = this.timer.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.stopCounting = this.stopCounting.bind(this);
  }

  init() {
    let audio = document.getElementById("beep");

    this.props.updateState(5, 25, 25, 0, true);
    clearInterval(this.props.intervalId);
    this.props.updateTimerLabel('Session');
    audio.pause();
    audio.currentTime = 0;
  }

  timer() {
    let minutesLeft = this.props.minutesLeft;
    let secondsLeft = this.props.secondsLeft;
    let breakMinutesLeft = this.props.breakMinutesLeft;
    let audio = document.getElementById("beep");

    if (this.props.timerLabel === 'Session') {
      if (minutesLeft === 0 && secondsLeft == 0) {
        this.props.updateTimerLabel('Break');
        this.props.updateBreakTimeLeft(this.props.breakLength, secondsLeft);
        audio.play();
      } else if (secondsLeft === 0) {
        minutesLeft -= 1;
        secondsLeft = 59;
      } else {
        secondsLeft -= 1;
      }

      this.props.updateTimeLeft(minutesLeft, secondsLeft);
    } else

    if (this.props.timerLabel === 'Break') {
      if (breakMinutesLeft === 0 && secondsLeft == 0) {
        this.props.updateTimerLabel('Session');
        this.props.updateTimeLeft(this.props.sessionLength, secondsLeft);
        audio.play();
      } else if (secondsLeft === 0) {
        breakMinutesLeft -= 1;
        secondsLeft = 59;
      } else {
        secondsLeft -= 1;
      }

      this.props.updateBreakTimeLeft(breakMinutesLeft, secondsLeft);
    }
  }

  startCounting(timer) {
    let intervalId = setInterval(timer, 1000);
    this.props.updateIntervalId(intervalId);
  }

  stopCounting() {
    clearInterval(this.props.intervalId);
  }

  handleStartStop() {
    this.props.counting === true ? this.props.updateCounting(false) : this.props.updateCounting(true);

    this.props.counting === true ? this.startCounting(this.timer) : this.stopCounting();
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "bottom_buttons" }, /*#__PURE__*/
      React.createElement("div", { id: "start_stop", onClick: this.handleStartStop }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-play" }), /*#__PURE__*/
      React.createElement("i", { class: "fas fa-pause" })), /*#__PURE__*/

      React.createElement("div", { id: "reset", onClick: this.init }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-redo-alt" }))), /*#__PURE__*/


      React.createElement("div", { id: "author" }, "Designed by", /*#__PURE__*/

      React.createElement("br", null), "Billy Georgopoulos")));




  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutesLeft: 25,
      secondsLeft: 0,
      counting: true,
      intervalId: 0,
      timerLabel: 'Session',
      breakMinutesLeft: 5 };

    this.updateState = this.updateState.bind(this);
    this.updateBreakLength = this.updateBreakLength.bind(this);
    this.updateSessionLength = this.updateSessionLength.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.updateCounting = this.updateCounting.bind(this);
    this.updateIntervalId = this.updateIntervalId.bind(this);
    this.updateTimerLabel = this.updateTimerLabel.bind(this);
    this.updateBreakTimeLeft = this.updateBreakTimeLeft.bind(this);
  }

  updateState(breakLength, sessionLength, minutesLeft, secondsLeft, counting) {
    this.setState({
      breakLength: breakLength,
      sessionLength: sessionLength,
      minutesLeft: minutesLeft,
      secondsLeft: secondsLeft,
      counting: counting });

  }

  updateBreakLength(breakLength) {
    this.setState({
      breakLength: breakLength });

  }

  updateSessionLength(sessionLength) {
    this.setState({
      sessionLength: sessionLength });

  }

  updateTimeLeft(minutesLeft, secondsLeft) {
    this.setState({
      minutesLeft: minutesLeft,
      secondsLeft: secondsLeft });

  }

  updateCounting(counting) {
    this.setState({
      counting: counting });

  }

  updateIntervalId(intervalId) {
    this.setState({
      intervalId: intervalId });

  }

  updateTimerLabel(timerLabel) {
    this.setState({
      timerLabel: timerLabel });

  }

  updateBreakTimeLeft(breakMinutesLeft, secondsLeft) {
    this.setState({
      breakMinutesLeft: breakMinutesLeft,
      secondsLeft: secondsLeft });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "app" }, /*#__PURE__*/
      React.createElement("div", { id: "title" }, "Pomodoro Clock: a simple workflow tool"), /*#__PURE__*/
      React.createElement(Lengths, {
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength,
        updateState: this.updateState,
        updateBreakLength: this.updateBreakLength,
        updateSessionLength: this.updateSessionLength,
        updateTimeLeft: this.updateTimeLeft }), /*#__PURE__*/

      React.createElement(Clock, {
        updateState: this.updateState,
        minutesLeft: this.state.minutesLeft,
        secondsLeft: this.state.secondsLeft,
        breakMinutesLeft: this.state.breakMinutesLeft,
        updateTimeLeft: this.updateTimeLeft,
        timerLabel: this.state.timerLabel }), /*#__PURE__*/

      React.createElement(ActivityButtons, {
        updateState: this.updateState,
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength,
        minutesLeft: this.state.minutesLeft,
        secondsLeft: this.state.secondsLeft,
        updateTimeLeft: this.updateTimeLeft,
        updateCounting: this.updateCounting,
        counting: this.state.counting,
        updateIntervalId: this.updateIntervalId,
        intervalId: this.state.intervalId,
        updateTimerLabel: this.updateTimerLabel,
        timerLabel: this.state.timerLabel,
        breakMinutesLeft: this.state.breakMinutesLeft,
        updateBreakTimeLeft: this.updateBreakTimeLeft })));



  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));