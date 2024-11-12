import numpy as np

def sigmoid_num(x):
    if x > 20:
        return 1
    if x < -20:
        return 0
    return 1 / (1 + np.exp(-x))

sigmoid = np.vectorize(sigmoid_num)

def sigmoid_prime_num(x):
    return sigmoid_num(x) * (1 - sigmoid_num(x))

sigmoid_prime = np.vectorize(sigmoid_prime_num)

class Network(object):
    def __init__(self, size_layers):
        self.inputlayer = np.zeros(size_layers[0])
        self.hiddenlayer = np.zeros(size_layers[1])
        self.outputlayer = np.zeros(size_layers[2])

        self.hid_z = np.zeros(size_layers[1])
        self.out_z = np.zeros(size_layers[2])

        self.out_error = np.zeros(size_layers[2])
        self.hid_error = np.zeros(size_layers[1])

        self.weights_inp_hid = np.random.normal(size=(size_layers[1], size_layers[0]))
        self.weights_hid_out = np.random.normal(size=(size_layers[2], size_layers[1]))

        self.bias_hid = np.random.normal(size=size_layers[1])
        self.bias_out = np.random.normal(size=size_layers[2])

    def feedfwd(self, a):
        self.inputlayer = a
        self.hid_z = np.matmul(self.weights_inp_hid, self.inputlayer) + self.bias_hid
        self.hiddenlayer = sigmoid(self.hid_z)

        self.out_z = np.matmul(self.weights_hid_out, self.hiddenlayer) + self.bias_out
        self.outputlayer = sigmoid(self.out_z)

    def backprop(self, expected_res):
        self.out_error = np.multiply(self.outputlayer - expected_res, sigmoid_prime(self.out_z))
        self.hid_error = np.multiply(np.matmul(np.transpose(self.weights_hid_out), self.out_error), sigmoid_prime(self.hid_z))

        grad_bias_out = self.out_error
        grad_bias_hid = self.hid_error
        
        grad_weight_inp_hid = np.outer(self.hid_error, self.inputlayer)
        grad_weight_hid_out = np.outer(self.out_error, self.hiddenlayer)

        return grad_weight_inp_hid, grad_weight_hid_out, grad_bias_hid, grad_bias_out

    def gradient_desc(self, sample, learn_rate):
        avg_grad_weight_inp_hid = np.zeros(self.weights_inp_hid.shape)
        avg_grad_weight_hid_out = np.zeros(self.weights_hid_out.shape)
        avg_grad_bias_hid = np.zeros(self.bias_hid.shape)
        avg_grad_bias_out = np.zeros(self.bias_out.shape)

        for i, a in enumerate(sample):
            self.feedfwd(a[0])
            grad_weight_inp_hid, grad_weight_hid_out, grad_bias_hid, grad_bias_out = self.backprop(a[1])

            avg_grad_weight_inp_hid = (avg_grad_weight_inp_hid * i + grad_weight_inp_hid) / (i + 1)
            avg_grad_weight_hid_out = (avg_grad_weight_hid_out * i + grad_weight_hid_out) / (i + 1)
            avg_grad_bias_hid = (avg_grad_bias_hid * i + grad_bias_hid) / (i + 1)
            avg_grad_bias_out = (avg_grad_bias_out * i + grad_bias_out) / (i + 1)

        length = len(sample)
        self.weights_inp_hid -= (learn_rate / length) * avg_grad_weight_inp_hid
        self.weights_hid_out -= (learn_rate / length) * avg_grad_weight_hid_out
        self.bias_hid -= (learn_rate / length) * avg_grad_bias_hid
        self.bias_out -= (learn_rate / length) * avg_grad_bias_out

    def stochastic_batch(self, train_x_upd, train_y, batch_size, epochs, learn_rate, test_x_upd, test_y):
        for epoch in range(epochs):
            train = [a for a in zip(train_x_upd, train_y)]
            np.random.shuffle(train)
            batches = [train[k: k + batch_size] for k in range(0, len(train_x_upd), batch_size)]
            for batch in batches:
                self.gradient_desc(batch, learn_rate)

            evaluate = 0
            for i in range(test_x_upd.shape[0]):
                self.feedfwd(test_x_upd[i])
                if test_y[i] == self.outputlayer.argmax():
                    evaluate += 1
            print(f"Epoch no. {epoch} done. Accuracy {evaluate / test_x_upd.shape[0] * 100} pc")
