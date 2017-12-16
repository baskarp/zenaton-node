import { mixinClass } from '../Utils'
import { ExternalZenatonException } from '../Exceptions'
import WithTimeout from '../Traits/WithTimeout'

class Base {}
class Wait extends mixinClass(Base, WithTimeout) {
	constructor(event = null) {
		super()

		if (event != null && (typeof event !== 'string')) {
			throw new ExternalZenatonException('bad event argument')
		}

		this.data = null
		this.name = 'Wait'
		this.event = event
	}

	handle() {
		this.time_sleep_until(this.getTimeoutTimestamp())
	}

	getEvent() {
		return this.event
	}


}

module.exports = Wait
