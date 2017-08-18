class ApiVersionConstraint
	attr_accessor :version

	def initialize(options)
		@version = options.fetch(:version)
	end

	def matches?(request)
		request.headers.fetch(:accept) === "application/vnd.pingpong.v#{self.version.to_f}+json"
	end
end